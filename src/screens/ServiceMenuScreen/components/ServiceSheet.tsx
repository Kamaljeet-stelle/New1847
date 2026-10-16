import { useMemo, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons/static';
import { PrimaryButton } from '../../../components/atoms/PrimaryButton';
import {
  addonsFor,
  formatAed,
  priceLabel,
  quoteFor,
  staffChoices,
  variantsFor,
  type ServiceChoice,
  type StaffChoice,
} from '../../../data/bookingOptions';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { categoryLabels, type Service } from '../../../types/catalog';
import { SheetOption } from './SheetOption';

type Step = 'variant' | 'addon' | 'staff';

const stepLabels: Record<Step, string> = {
  variant: 'Variant',
  addon: 'Add-on',
  staff: 'Therapist',
};

const staffIcons = {
  any: 'account-group-outline',
  male: 'gender-male',
  female: 'gender-female',
} as const;

type Props = {
  service: Service;
  initial?: ServiceChoice;
  onClose: () => void;
  onConfirm: (choice: ServiceChoice) => void;
};

function StaffAvatar({ staff }: { staff: StaffChoice }) {
  return (
    <View style={styles.avatar}>
      {staff.kind === 'person' ? (
        <Text style={styles.initial}>{staff.name.charAt(0)}</Text>
      ) : (
        <MaterialDesignIcons name={staffIcons[staff.kind]} size={18} color={colors.ink} />
      )}
    </View>
  );
}

export function ServiceSheet({ service, initial, onClose, onConfirm }: Props) {
  const insets = useSafeAreaInsets();
  const variants = useMemo(() => variantsFor(service.id), [service.id]);
  const addons = useMemo(() => addonsFor(service.id), [service.id]);
  const steps: Step[] = addons.length ? ['variant', 'addon', 'staff'] : ['variant', 'staff'];
  const [stepIndex, setStepIndex] = useState(0);
  const [variantId, setVariantId] = useState(initial?.variantId ?? '');
  const [addonId, setAddonId] = useState(initial?.addonId ?? '');
  const [staffId, setStaffId] = useState(initial?.staffId ?? '');

  const step = steps[stepIndex];
  const last = stepIndex === steps.length - 1;
  const variant = variants.find(item => item.id === variantId);
  const addon = addons.find(item => item.id === addonId);
  const quote = variant ? quoteFor(variant, addon) : null;
  const canNext = step === 'variant' ? !!variant : step === 'staff' ? !!staffId : true;

  const next = () => {
    if (!last) {
      setStepIndex(current => current + 1);
      return;
    }
    const staff = staffChoices.find(item => item.id === staffId);
    if (!variant || !staff || !quote) {
      return;
    }
    onConfirm({
      serviceId: service.id,
      variantId: variant.id,
      variantName: variant.name,
      addonId: addon?.id ?? '',
      addonName: addon?.name ?? '',
      staffId: staff.id,
      staffName: staff.name,
      minutes: quote.minutes,
      priceAed: quote.priceAed,
    });
  };

  return (
    <Modal visible transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <Pressable
          accessibilityLabel="Close"
          style={StyleSheet.absoluteFill}
          onPress={onClose}
        />
        <View style={[styles.sheet, { paddingBottom: Math.max(insets.bottom, 16) }]}>
          <View style={styles.handle} />
          <View style={styles.head}>
            <View style={styles.headCopy}>
              <Text style={styles.kicker}>{categoryLabels[service.category]}</Text>
              <Text style={styles.title}>{service.name}</Text>
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Close"
              hitSlop={10}
              onPress={onClose}
              style={styles.close}>
              <MaterialDesignIcons name="close" size={20} color={colors.ink} />
            </Pressable>
          </View>

          <View style={styles.steps}>
            {steps.map((item, index) => (
              <View key={item} style={styles.stepItem}>
                <View style={[styles.stepBar, index <= stepIndex && styles.stepBarOn]} />
                <Text style={[styles.stepText, index === stepIndex && styles.stepTextOn]}>
                  {index + 1}. {stepLabels[item]}
                </Text>
              </View>
            ))}
          </View>

          <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent}>
            {step === 'variant' ? (
              <>
                <Text style={styles.prompt}>Pick a variant</Text>
                {variants.map(item => (
                  <SheetOption
                    key={item.id}
                    title={item.name}
                    minutes={item.minutes}
                    price={item.priceAed == null ? 'At lounge' : formatAed(item.priceAed)}
                    selected={item.id === variantId}
                    onPress={() => setVariantId(item.id)}
                  />
                ))}
              </>
            ) : null}

            {step === 'addon' ? (
              <>
                <Text style={styles.prompt}>Add something (optional)</Text>
                {addons.map(item => (
                  <SheetOption
                    key={item.id}
                    title={item.name}
                    minutes={item.minutes}
                    price={item.priceAed == null ? undefined : `+ ${formatAed(item.priceAed)}`}
                    selected={item.id === addonId}
                    multiple
                    onPress={() => setAddonId(current => (current === item.id ? '' : item.id))}
                  />
                ))}
              </>
            ) : null}

            {step === 'staff' ? (
              <>
                <Text style={styles.prompt}>Choose your therapist</Text>
                {staffChoices.map(item => (
                  <SheetOption
                    key={item.id}
                    title={item.name}
                    detail={item.detail}
                    leading={<StaffAvatar staff={item} />}
                    selected={item.id === staffId}
                    onPress={() => setStaffId(item.id)}
                  />
                ))}
              </>
            ) : null}
          </ScrollView>

          <View style={styles.footer}>
            {stepIndex > 0 ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Previous step"
                onPress={() => setStepIndex(current => current - 1)}
                style={styles.back}>
                <MaterialDesignIcons name="chevron-left" size={24} color={colors.ink} />
              </Pressable>
            ) : null}
            <PrimaryButton
              title={last ? `Add · ${priceLabel(quote?.priceAed)}` : 'Next'}
              onPress={next}
              disabled={!canNext}
              style={styles.next}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(26, 25, 22, 0.45)',
  },
  sheet: {
    maxHeight: '86%',
    backgroundColor: colors.parchment,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    paddingHorizontal: 20,
  },
  handle: {
    alignSelf: 'center',
    width: 44,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.line,
    marginTop: 10,
    marginBottom: 14,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  headCopy: {
    flex: 1,
  },
  kicker: {
    ...typography.label,
    color: colors.copper,
  },
  title: {
    ...typography.sectionTitle,
    fontSize: 24,
    color: colors.ink,
    marginTop: 6,
  },
  close: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.paper,
    borderWidth: 1,
    borderColor: colors.line,
  },
  steps: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 18,
    marginBottom: 14,
  },
  stepItem: {
    flex: 1,
  },
  stepBar: {
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.line,
  },
  stepBarOn: {
    backgroundColor: colors.copper,
  },
  stepText: {
    ...typography.caption,
    fontSize: 12,
    color: colors.placeholder,
    marginTop: 6,
  },
  stepTextOn: {
    color: colors.ink,
    fontWeight: '700',
  },
  body: {
    flexGrow: 0,
  },
  bodyContent: {
    paddingBottom: 8,
  },
  prompt: {
    ...typography.label,
    color: colors.muted,
    marginBottom: 10,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.copperSoft,
    borderWidth: 1,
    borderColor: colors.line,
  },
  initial: {
    ...typography.cardTitle,
    color: colors.ink,
  },
  footer: {
    flexDirection: 'row',
    gap: 10,
    paddingTop: 12,
  },
  back: {
    width: 52,
    height: 52,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.ink,
  },
  next: {
    flex: 1,
  },
});
